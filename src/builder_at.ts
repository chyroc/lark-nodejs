class AtBuilder {
  atAll(): string {
    return '<at user_id="all"></at>'
  }

  atOpenID(openID: string): string {
    return `<at user_id="${openID}"></at>`
  }
}

const atBuilder = new AtBuilder()

export default atBuilder
