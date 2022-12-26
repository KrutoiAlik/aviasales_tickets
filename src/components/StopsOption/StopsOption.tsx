import React, {ChangeEvent, FunctionComponent} from 'react';
import './StopsOption.css';

type StopsOptionProps = {
    htmlId: string,
    checked: boolean,
    label: string,
    stops: number,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
    handleClickOnlyThisOption: () => void
}
export const StopsOption: FunctionComponent<StopsOptionProps> = (props) => {
    return <div className='stops-option'>
        <div>
            <input id={props.htmlId}
                   className='checkbox'
                   checked={props.checked}
                   type='checkbox'
                   value={props.stops}
                   onChange={props.handleChange}/>
            <label htmlFor={props.htmlId}>{props.label}</label>
        </div>
        <div>
            <span className='only-this-option__btn'
                  onClick={props.handleClickOnlyThisOption}>ТОЛЬКО</span>
        </div>
    </div>
}