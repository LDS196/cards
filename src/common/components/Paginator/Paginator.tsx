import React from "react"
import { useSelector} from "react-redux";
import {Pagination, PaginationProps} from "antd";

import { RootState } from "app/store"
import { useActions } from "common/hooks/useActions"
import { packsActions} from "features/Packs/packs.slise"



export const Paginator = () => {
    const { cardPacksTotalCount,page } = useSelector((state: RootState) => state.packs)
    const { changePageSize,changePage } = useActions(packsActions)


    const onPageChanged = (pageNumber: number) => {
        changePage(pageNumber)
    }
    const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
       changePageSize(pageSize)

    };
    return (
        <div style={{margin:'15px 0px', textAlign:'center'}}>
            <Pagination defaultCurrent={page} total={cardPacksTotalCount} onChange={onPageChanged}
                        onShowSizeChange={onShowSizeChange}/>

        </div>
    )
};

