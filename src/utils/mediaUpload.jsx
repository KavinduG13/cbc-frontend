import { createClient } from "@supabase/supabase-js"

const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6b25uaWhhd3dzb3Npc3Z3ZG52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1OTE2MjcsImV4cCI6MjA3MzE2NzYyN30.J2M1vSX5IP19ahHVToNa1_M1mTIWCThvtGbzZku9Zd4"
const supabaseUrl = "https://hzonnihawwsosisvwdnv.supabase.co"

const supabase = createClient(supabaseUrl, anonKey)

/*
supabase.storage.from("Images").upload(file.name, file, {
            upsert: false,
            cacheControl: "3600",
        }).then(
            () => {
                const publicUrl = supabase.storage.from("Images").getPublicUrl(file.name).data.publicUrl
                console.log(publicUrl)
            }
        )
*/

export default function mediaUpload(file) {
    return new Promise(
        (resolve, reject) => {
            if (file == null) {
                reject("No file selected")
            } else {
                const timestamp = new Date().getTime()
                const fileName = timestamp + file.name

                supabase.storage.from("Images").upload(fileName, file, {
                    upsert: false,
                    cacheControl: "3600",
                }).then(
                    () => {
                        const publicUrl = supabase.storage.from("Images").getPublicUrl(fileName).data.publicUrl
                        resolve(publicUrl)
                    }
                ).catch(
                    () => {
                        reject("An error occurred")
                    }
                )
            }
        }
    )
}