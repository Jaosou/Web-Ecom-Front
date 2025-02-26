export const changStatusFormat = (status)=>{
    switch (status) {
        case 'Not process':
            return 'items-center py-1 px-3 rounded-xl bg-gray-200 font-bold text-gray-900'
            break;
        case 'Processing':
            return 'items-center py-1 px-3 rounded-xl bg-amber-200 font-bold text-amber-700'
            break;
        case 'Complete':
            return 'items-center py-1 px-3 rounded-xl bg-emerald-300 font-bold text-emerald-900'
            break;
        case 'Cancelled':
            return 'items-center py-1 px-3 rounded-xl bg-red-300 font-bold text-red-900'
            break;
        default:
            break;
    }
}

export const changeEnableUser =  (status)=>{
    switch (status) {
        case true:
            return 'items-center py-1 px-3 rounded-xl bg-emerald-300 font-bold text-emerald-900'
            break;
        case false:
            return 'items-center py-1 px-3 rounded-xl bg-red-300 font-bold text-red-900'
            break;
    
        default:
            break;
    }
}

export const statusAdmin =  (status)=>{
    switch (status) {
        case "Admin":
            return 'items-center py-1 px-3 rounded-xl bg-cyan-300 font-bold text-cyan-900'
            break;
        case "user":
            return 'items-center py-1 px-3 rounded-xl bg-gray-300 font-bold text-gray-900'
            break;
    
        default:
            break;
    }
}