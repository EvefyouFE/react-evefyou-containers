/*
 * @Author: EvefyouFE
 * @Date: 2023-08-20 23:36:49
 * @FilePath: \react-evefyou-containers\components\TableContainer\hooks\useTableLayout.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { useLayoutEffect, useMemo } from "react";
import { useDebounceFn, useEventListener } from "ahooks";
import { useMountEffect } from "react-evefyou-hooks/useMountEffect";
import { getViewportOffset } from "react-evefyou-common/utils/dom/getViewportOffset";
import { TableContainerProps } from "../props";
import { UseTableLayoutHooksMethods, UseTableLayoutReturnType } from "../typing";
import { Recordable } from "react-evefyou-common";

export function useTableLayout<T extends Recordable = any, FT = any>(
    props: TableContainerProps<T, FT>,
    methods: UseTableLayoutHooksMethods<T, FT>
): UseTableLayoutReturnType {
    const {
        canResize = true,
        canResizeParent = false,
        scroll,
        resizeHeightOffset,
        maxHeight,
        openSearchForm = true,
    } = props;
    const {
        tableInstance: { getDataSource, getPagination, setHeight, getElement: getTableElemnt },
        instance: { getElement: getTableContainerElemnt }
    } = methods;
    const canResizeMemo = useMemo(() => canResize && !scroll?.y, [canResize, scroll])
    // const [heightState,setHeightState] = useState(0)
    const { run } = useDebounceFn(resetTableHeight, { wait: 100 }) as { run: () => void }
    let paginationEl: HTMLElement | null;
    let footerEl: HTMLElement | null;
    let bodyEl: HTMLElement | null;

    useLayoutEffect(() => {
        run()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canResizeMemo, getDataSource])

    // useEffect(() => {
    //     heightState && setHeight?.(heightState)
    // }, [heightState])

    useEventListener('resize', () => {
        run()
    })

    useMountEffect(() => {
        run()
    })

    function resetTableHeight() {
        calcTableHeight()
    }

    function calcTableHeight() {
        const tableEl = getTableElemnt?.()
        if (!tableEl) return;

        const dataSource = getDataSource?.()
        if (!canResizeMemo || !dataSource?.length) return;

        bodyEl ??= tableEl.querySelector('.ant-table-body')
        if (!bodyEl) return;
        bodyEl.style.height = 'unset';

        const hasScrollBarY = bodyEl.scrollHeight > bodyEl.clientHeight;
        const hasScrollBarX = bodyEl.scrollWidth > bodyEl.clientWidth;
        if (hasScrollBarY) {
            tableEl.classList.contains('hide-scrollbar-y') &&
                tableEl.classList.remove('hide-scrollbar-y');
        } else {
            !tableEl.classList.contains('hide-scrollbar-y') && tableEl.classList.add('hide-scrollbar-y');
        }
        if (hasScrollBarX) {
            tableEl.classList.contains('hide-scrollbar-x') &&
                tableEl.classList.remove('hide-scrollbar-x');
        } else {
            !tableEl.classList.contains('hide-scrollbar-x') && tableEl.classList.add('hide-scrollbar-x');
        }

        let paginationHeight = 0;
        const pagination = getPagination?.()
        if (pagination) {
            paginationEl = tableEl.querySelector('.ant-pagination') as HTMLElement;
            if (paginationEl) {
                const { offsetHeight } = paginationEl;
                const paginationRect = getComputedStyle(paginationEl)
                const marginHeight = Number.parseFloat(paginationRect.marginTop) + Number.parseFloat(paginationRect.marginBottom)
                paginationHeight += marginHeight + (offsetHeight || 0);
            } else {
                paginationHeight += 24;
            }
        } else {
            paginationHeight = -8;
        }

        let footerHeight = 0;
        if (pagination) {
            if (!footerEl) {
                footerEl = tableEl.querySelector('.ant-table-footer') as HTMLElement;
            } else {
                const { offsetHeight } = footerEl;
                footerHeight += offsetHeight || 0;
            }
        }

        const titleHeight = (tableEl.querySelector('.ant-table-title') as HTMLElement)?.offsetHeight ?? 0;


        let headerHeight = 0;
        const headEl = tableEl.querySelector('.ant-table-thead ');
        if (!headEl) return;
        if (headEl) {
            headerHeight = (headEl as HTMLElement).offsetHeight;
        }

        let bodyHeightIncludeBottom = 0;
        const paddingHeight = 28;
        const tableContainerEl = getTableContainerElemnt?.()
        if (!tableContainerEl) return;
        const formEl = tableContainerEl?.querySelector('.ant-form')
        if (!formEl) return;
        const formContentEl = formEl?.children[0] as HTMLDivElement
        if (tableContainerEl && canResizeParent) {
            const containerPadding = 14;
            const tablePadding = 14;
            let formMargin = 14;
            const containerHeight = tableContainerEl.offsetHeight ?? 0;

            let formHeight = formContentEl.offsetHeight ?? 0;
            if (!openSearchForm) {
                formMargin = 0;
            }
            if (formHeight) {
                formHeight += formMargin;
            }
            bodyHeightIncludeBottom = containerHeight - formHeight - titleHeight - tablePadding - containerPadding;
        } else {
            // Table height from bottom
            bodyHeightIncludeBottom = getViewportOffset(headEl).bottomIncludeBody;
        }
        const layoutfooterHeight = 48

        let height =
            bodyHeightIncludeBottom -
            (resizeHeightOffset || 0) -
            paddingHeight -
            paginationHeight -
            layoutfooterHeight -
            footerHeight -
            headerHeight;
        height = (!maxHeight || height <= maxHeight) ? height : maxHeight;
        setHeight?.(height);

        bodyEl.style.height = `${height}px`;
    }

    return {
        resetTableHeight,
    }
}