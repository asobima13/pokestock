export const getTanggal = (date) => {
    const bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]
    let d = new Date(date),
    year = d.getFullYear(),
    month = bulan[d.getMonth()],
    // month = d.getMonth() + 1,
    day = d.getDate();

    // if (month.length < 2) 
    //     month = '0' + month;

    return `${day} ${month} ${year}`
}

export const getWaktu = (date) => {
    let d = new Date(date);
    let hour = String(d.getHours());
    let min = String(d.getMinutes());

    if (hour.length < 2)
        hour = '0' + hour;
    if (min.length < 2)
        min = '0' + min;

    return `${hour}:${min}`
}