import RequireContext = __WebpackModuleApi.RequireContext;

export interface Type<T> extends Function {
    new(...args: any[]): T;
}

interface WebpackLazyModule extends RequireContext {
    default?: Type<any>;
}

interface ImporterRequireContext {
    keys(): string[];

    (id: string): Promise<WebpackLazyModule>;

    <T>(id: string): T;

    resolve(id: string): string;

    id: string;
}

export const CMP_SELECTOR = '[data-cmp-is]';

const cmpModulesCtx: ImporterRequireContext = require.context('../components', true, /\.ts$/, 'lazy');

export const componentInstances: any[] = [];

const dynamicModulesImporter = (componentReference: HTMLElement): void => {
    const classHandlerName = componentReference.dataset.cmpIs?.toLocaleLowerCase() as string;
    const cmpCtx = cmpModulesCtx.keys();
    const matched = cmpCtx.filter((path) => path.toLocaleLowerCase().includes(`/${classHandlerName}.ts`));

    if (matched.length) {
        cmpModulesCtx(matched[0])
            .then((module) => {
                if (!module.default) {
                    return;
                }

                const CmpModule = module.default;
                componentInstances.push(
                    {
                        name: classHandlerName,
                        componentRef: componentReference,
                        instance: new CmpModule(componentReference)
                    },
                );
            })
            .catch(() => {
                // logger.error();
            });
    }
};

const staticImporter = (): void => {
    const $cmpSelector = document.querySelectorAll(CMP_SELECTOR);

    $cmpSelector.forEach((cmpRef: HTMLElement) => {
        dynamicModulesImporter(cmpRef);
    });
};

document.addEventListener('DOMContentLoaded', staticImporter);
