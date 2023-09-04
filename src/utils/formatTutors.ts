function isValidHttpUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (err) {
        return false;
    }
}


export default function formatTutors(tutors: any) {
    return tutors?.map((tutor) => {
        return {
            ...tutor,
            image: isValidHttpUrl(tutor.image) ? tutor.image : `/uploads/tutors/${tutor.image}`
        }
    })
}
