const KEY = 'opd_bookings_v1'


export function loadBookings(){
try{
const raw = localStorage.getItem(KEY) || '[]'
return JSON.parse(raw)
}catch(e){
return []
}
}
export function saveBookings(bookings){
localStorage.setItem(KEY, JSON.stringify(bookings))
}