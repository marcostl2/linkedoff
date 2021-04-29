interface Vacancy {
    description: string,
    title: string,
    id: number
}

export interface Company {
    uid: string,
    name: string,
    cnpj: string,
    vacancies: Array<Vacancy>
}