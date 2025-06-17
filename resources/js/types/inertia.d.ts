export interface PagePropsBase {
    auth?: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: any;
}

export type PageProps<T = {}> = PagePropsBase & T;
