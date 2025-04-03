import {v4 as uuidv4} from "uuid";
import supabase from "./supabase";

export const uploadImage = async (file,userId,bucket = "featured-images") =>{

    try {
        const filExt = file.name.split('.').pop();
        const filename =`${uuidv4()}.${filExt}`;
        const filepath =`${userId}/${filename}`;
        console.log(filepath);
        

        const {data,error} = await supabase.storage
        .from(bucket)
        .upload(filepath,file,{
            cacheControl:"3600",
            contentType:file.type,
            upsert:true
        })
        if(error) throw error;

        const {data:imageUrl} = supabase.storage.from(bucket).getPublicUrl(filepath);

        return{
            path:filepath,
            url:imageUrl.publicUrl
        }

    } catch (error) {
        console.error("error uploading image: ",error);
        throw error;
    }

}