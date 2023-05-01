import React, {memo, useEffect,} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Pagination, PaginationProps} from "antd";


const Paginator = memo(() => {

    const totalItemsCount = useSelector(getTotalUsersCountSelector)
    const pageSize = useSelector(getPageSizeSelector)
    const currentPage = useSelector(getCurrentPageSelector)
    const filter = useSelector(getUsersFilterSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize, filter))
    }, [pageSize])

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter))
    }

    const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
        dispatch(changePageSize(pageSize))

    };
    return (
        <div style={{margin:'15px 0px', textAlign:'center'}}>
            <Pagination defaultCurrent={currentPage} total={totalItemsCount} onChange={onPageChanged}
                        onShowSizeChange={onShowSizeChange}/>

        </div>
    )
});

export default Paginator;