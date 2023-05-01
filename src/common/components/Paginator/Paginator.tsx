import React, {memo, useEffect,} from 'react';
import { useSelector} from "react-redux";
import {Pagination, PaginationProps} from "antd";

import { RootState } from "app/store"
import { useActions } from "common/hooks/useActions"
import { packsActions, packsThunks } from "features/Packs/packs.slise"



export const Paginator = memo(() => {

    const cardPacksTotalCount = useSelector((state:RootState)=>state.packs.cardPacksTotalCount)
    const pageCount = useSelector((state:RootState)=>state.packs.pageCount)
    const page = useSelector((state:RootState)=>state.packs.page)
    const { getPacks } = useActions(packsThunks)
    const { changePageSize } = useActions(packsActions)
    useEffect(() => {
       getPacks({params:{ page, pageCount }})
    }, [pageCount])

    const onPageChanged = (pageNumber: number) => {
        getPacks({params:{ page:pageNumber, pageCount }})
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
});

