interface IUser {
    user_name: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    adress: string;
    id?: number;
    email: string;
    is_first_login?: boolean;
    is_active?: boolean;
    is_staff?: boolean;
    algorithm: string;
}

interface ICategory {
    id: number;
    name: string;
}

interface IArticle {
    article_id?: string;
    title: string;
    descritpion: string;
    publication_date: string;
    image_url?: string;
    author: string;
    content: string;
    feed: IFeed;
    article_interactions?: IInteraction[];
    categories: ICategory[];
    feed_id?: string;
    categories_ids?: number[];
}

interface IInteraction {
    id: number;
    article: IArticle;
    interaction_type: string;
    timestamp: string;
    rating: number;
    opinion: string;
    share: string;
    user: number;
}

interface IFeed {
    feed_id: string; // Assuming UUIDs are represented as strings in your frontend
    url: string;
    name: string;
    image_url: string;
    last_updated: string; // The date could be represented as a string in ISO format
    // Assuming UserCustomised related data might not be directly included or needed in this interface
  }
  



export type { IUser, IInteraction, IArticle, IFeed, ICategory };




