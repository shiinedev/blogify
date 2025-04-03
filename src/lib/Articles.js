import ArticleEditorPage from "../pages/ArticleEditorPage";
import supabase from "./supabase";


export const createArticle = async (article) =>{
    console.log("creating article....");

    const articleData = {
        title:article.title,
        content:article.content,
        tags:article.tags,
        feature_image:article.featuredImageUrl,
        published:article.published || false,
        author_id:article.authorId
    }
    const { data, error } = await supabase
  .from('articles')
  .insert(articleData)
  .select()
  .single()

    if(error){
        console.error('error Creating article',error)
        throw error
    }

    console.log("creating article successfully !", data);

    return data;
}

export const getArticlesByAuthor = async (authorId,{includeUnPublished = false, offset = 0 , limit = 10}) =>{


    let query = supabase
    .from("articles")
    .select(`* , comments:comments(count)`)
    .eq("author_id",authorId)
    .order("created_at",{ascending:false})
    .range(offset, offset + limit - 1)

    if(!includeUnPublished){
        query = query.eq("published",true);
    }

    const{data,error,count } = await query;
    if(error) throw error;

    return{
        articles:data,
        count
    }
}

export const deleteArticle = async (id) => { 

    console.log("the id we want to delete ",id);

   // delete comments

   const {error:commentsError} = await supabase.from("comments").delete().eq("article_id",id);
   
   if(commentsError){
    console.log("error for deleting comments",commentsError);
   }else{
    console.log("comments deleting successfully");
   }

   //deleting article

   const {data,error} = await supabase.from("articles").delete().eq("id",id).select();

   if(error){
    console.log("error for deleting article",error);
   }else{
    console.log("article deleting successfully",id);
   }

   return data;
}

export const getArticlesById = async (id) =>{


    const {data,error} = await supabase
    .from("articles")
    .select(`*,
        comments(id,content,created_at
        user:user_id(id,username,avatar_url)
        ),
        author:author_id(id, username, avatar_url)    
        `)
    .eq("id",id)
    .single()

    if(error){
        console.log("error fetching article",error);

    }

    return data;
 }

export const updateArticle = async (id,updates) =>{
   // console.log("updates:",updates);

    const {data,error} = await supabase
    .from("articles")
    .update({
        title:updates.title,
        content:updates.content,
        tags:updates.tags,
        feature_image:updates.featuredImageUrl,
        published:updates.published || false,
        updated_at: new Date()
    })
    .eq("id",id)
    .select()
    .single()

    if(error){
        console.log("error updating article",error);
        throw error;
    }

    return data
 }