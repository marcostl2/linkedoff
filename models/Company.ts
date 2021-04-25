interface Vacancy {
    description: string,
    id: number
}

export interface Company {
    uid: string,
    name: string,
    cnpj: string,
    vacancies: Array<Vacancy>
}