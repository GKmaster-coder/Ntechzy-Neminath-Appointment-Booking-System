export const OPD_ROOMS = [
{ id: 'OPD-1', name: 'OPD Room 1' },
{ id: 'OPD-2', name: 'OPD Room 2' },
{ id: 'OPD-3', name: 'OPD Room 3' },
{ id: 'OPD-4', name: 'OPD Room 4' },
{ id: 'OPD-5', name: 'OPD Room 5' },
]


// Helper: generate 30-min slots from 9:00 to 16:00
export function generateSlots(){
const slots = []
const start = new Date()
start.setHours(10,0,0,0)
const end = new Date()
end.setHours(16,0,0,0)
for(let t = new Date(start); t < end; t.setMinutes(t.getMinutes()+30)){
const hh = t.getHours().toString().padStart(2,'0')
const mm = t.getMinutes().toString().padStart(2,'0')
slots.push(`${hh}:${mm}`)
}
return slots
}