let students = getItemFromLocalStorage('students');

if(!students)
{
    let preDefinedStudents = [{
        'id':'anirudh.modi2@gmail.com',
        'name':'Anirdh Modi',
        'questions':[]
    },{
        'id':'anirudh.modi3@gmail.com',
        'name':'Chester Bennignton',
        'questions':[]
    },{
        'id':'anirudh.modi4@gmail.com',
        'name':'Billy Joe Armstrong',
        'questions':[]
    }];

    setItemInLocalStorage('students',preDefinedStudents);
}

export function setItemInLocalStorage(itemId, data)
{
    localStorage.setItem(itemId, JSON.stringify(data));
}

export function getItemFromLocalStorage(itemId)
{
    return JSON.parse(localStorage.getItem(itemId));
}
