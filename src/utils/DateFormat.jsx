import moment from 'moment'

export const dateFormat = (Date)=>{
    return moment(Date).format('l');
}