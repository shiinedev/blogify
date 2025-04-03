import supabase from "./supabase"


export const signup = async (email,password,username="") =>{

    let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
      })

      if(data?.user){
        const {date:sessionData} = await supabase.auth.getSession();
        if(!sessionData?.session){
          console.log("we don`t any session you can create your profile after login");
          return data;
          
        }
        const displayName = username || email.split("@")[0];

        const {data:profileData, error:profileError} = await supabase
          .from('users')
          .insert([
            { id:data.user.id, 
              username:displayName ,
              avarator_url:null
            },
          ])
          .select()
          .single()

          if(profileError){
            console.log("profile creation error ",profileError);
            
          }else{
            console.log("profile creation successfully ",profileData);
            
          }

        
      }
      return data
     
}

export const signin = async (email,password) =>{

  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })
  if(error) throw error;

  if(data?.user){
    try {
      const profile = await getUserProfile(data.user.id);
      console.log("profileData", profile);
      
    } catch (profileError) {
      console.error(profileError);
      throw profileError
    }
  }

  return data;
}

export async function getUserProfile(userId) {
  console.log('Getting user profile for ID:', userId)
  
  // Debug: Check if we have a valid session
  const { data: sessionData } = await supabase.auth.getSession()
  console.log('Current session:', sessionData)
  
  // First, try to get the existing profile
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  
  // If no profile exists, create one
  if (error && error.code === 'PGRST116') {
    console.log('No profile found, attempting to create one for user:', userId)
    
    // Get user email to derive username if needed
    const { data: userData } = await supabase.auth.getUser()
    console.log('Current user data:', userData)
    
    const email = userData?.user?.email || ''
    const defaultUsername = email ? email.split('@')[0] : `user_${Date.now()}`
    
    console.log('Creating profile with:', {
      id: userId,
      username: defaultUsername
    })
    
    // Create a new profile
    const { data: newProfile, error: insertError } = await supabase
      .from('users')
      .insert({
        id: userId,
        username: defaultUsername,
        avatar_url: null
      })
      .select()
      .single()
    
    if (insertError) {
      console.error('Profile creation error:', insertError)
      throw insertError
    }
    
    console.log('New profile created successfully:', newProfile)
    return newProfile
  }
  
  if (error) {
    console.error('Error fetching profile:', error)
    throw error
  }
  
  console.log('Existing profile found:', data)
  return data
}


export const onAuthChange = (callback)  =>{
  const {data} = supabase.auth.onAuthStateChange((event,session) =>{

    callback(session?.user || null, event);
  }
 )

  return () => data.subscription.unsubscribe();
}

export const signOut = async () =>{
  await supabase.auth.signOut();
  
}