import { useEffect } from 'react'
import style from '../css/Codi.module.css'


const ActionSheet = ({ actionSheetActive, setActionSheetActive }) => {

    useEffect(() => {
        // console.log(actionSheetActive, 'actionSheetActive');
        const ActionSheet = document.querySelector(`.${style.ActionSheet}.${style.active}`)
        const ActionBox = document.querySelector(`.${style.ActionBox}.${style.active}`);

        const handleClickOutside = (e) => {
            // console.log('---handleClickOutside');
            if (actionSheetActive && !ActionBox.contains(e.target) && ActionSheet.contains(e.target)) {
                setActionSheetActive(false);
                // console.log('바깥클릭함');
            }
        };
        document.addEventListener('click', handleClickOutside);

        // clean-up 함수: 컴포넌트가 unmount(제거)될 때 이벤트 리스너 제거
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [actionSheetActive, setActionSheetActive])


    const editLog = () => {
        console.log('수정 클릭');
        // 수정페이지로 이동하기
    }
    const deleteLog = () => {
        console.log('삭제 클릭');
    }

    return (
        <section className={`${style.ActionSheet} ${actionSheetActive ? style.active : ''}`}>
            <div className={`${style.ActionBox} ${actionSheetActive ? style.active : ''}`} >
                <button className='fontTitleM' onClick={editLog}>수정하기</button>
                <button className='fontTitleM' onClick={deleteLog}>삭제하기</button>
            </div>
        </section>
    )
}

export default ActionSheet