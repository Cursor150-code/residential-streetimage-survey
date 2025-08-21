import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Function to save survey response
export async function saveSurveyResponse(completeData) {
  console.log('🚀 Starting to save survey response...')
  console.log('📊 Complete data to save:', completeData)
  console.log('🔑 Supabase URL:', supabaseUrl)
  console.log('🗝️ Has Supabase Key:', !!supabaseAnonKey)
  
  try {
    const participantId = generateParticipantId()
    console.log('👤 Generated participant ID:', participantId)
    
    const insertData = {
      participant_id: participantId,
      responses: completeData.responses,
      displayed_images: completeData.displayed_images,
      survey_metadata: completeData.survey_metadata
    }
    
    console.log('📝 Data to insert:', insertData)
    
    const { data, error } = await supabase
      .from('survey_responses')
      .insert([insertData])
    
    console.log('📤 Insert result - data:', data)
    console.log('📤 Insert result - error:', error)
    
    if (error) {
      console.error('❌ Supabase insert error:', error)
      throw error
    }
    
    console.log('✅ Survey response saved successfully:', data)
    return { success: true, data }
  } catch (error) {
    console.error('💥 Error saving survey response:', error)
    console.error('💥 Error details:', error.message, error.details, error.hint)
    return { success: false, error }
  }
}

// Function to get street images from database
export async function getStreetImages() {
  try {
    const { data, error } = await supabase
      .from('street_images')
      .select('*')
      .eq('active', true)
    
    if (error) throw error
    
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching street images:', error)
    return { success: false, error }
  }
}

// Generate a unique participant ID
function generateParticipantId() {
  return 'participant_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
} 