import React, { FC } from "react"
import { Pagination, PaginationProps } from "antd"

type PropsType = {
    totalCount: number
    page: number
    changePage: (value: number) => void
    changePageSize: (value: number) => void
}

export const Paginator: FC<PropsType> = (props) => {
    const { totalCount, page, changePage, changePageSize } = props

    const onPageChanged = (pageNumber: number) => {
        changePage(pageNumber)
    }
    const onShowSizeChange: PaginationProps["onShowSizeChange"] = (current, pageSize) => {
        changePageSize(pageSize)
    }
    return (
        <div style={{ margin: "15px 0px", textAlign: "center" }}>
            <Pagination
                defaultCurrent={page}
                total={totalCount}
                onChange={onPageChanged}
                onShowSizeChange={onShowSizeChange}
            />
        </div>
    )
}
