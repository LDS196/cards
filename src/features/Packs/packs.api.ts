import { instance } from "common/api/common.api"

export const packsApi = {
    getPacks(data:FilterParamsType={}) {
        return instance.get<ResponseCardPacks>('cards/pack',data)
    },
  createPack(data:NewPackType ){
      return instance.post<any>('cards/pack',data)
  },
  deletePack(id:string){
      return instance.delete<any>(`cards/pack?${id}`)
  },
  updatePack(data:UpdatePackType){
      return instance.put('cards/pack',data)
  }
}

export type NewPackType={
  cardsPack: {
    name: string
    deckCover: string
    private: boolean
  }
}
export type UpdatePackType={
  cardsPack: {
    name: string
   id:string
  }
}
export type FilterParamsType = {
    params?: {
        packName?: string
        min?: number
        max?: number
        sortPacks?: string
        page?: number
        pageCount?: number
        user_id?: string
        block?: boolean
    }
}

export type PackType={
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
  user_name: string
}
export type ResponseCardPacks={
  cardPacks: Array<PackType>
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
}