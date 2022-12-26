import React, {ChangeEvent, FunctionComponent} from 'react';
import data from "../../tickets.json";
import {StopsOption} from "../StopsOption/StopsOption";
import './FilterSidebar.css';

const CURRENCY = new Map<string, string>([['RUB', '₽'], ['USD', '$'], ['EUR', '€']]);

type FilterSidebarProps = {
    currency: string,
    changeCurrency: (e: React.MouseEvent) => void,
    stopFilters: number[],
    setStopFilters: (filters: number[]) => void,
    generateStopsLabel: (stops: number) => string,
    updateStopFilters: (e: ChangeEvent<HTMLInputElement>) => void
}
export const FilterSidebar: FunctionComponent<FilterSidebarProps> = (props) => {

    const getCurrencyButtons = () => {
        return Array.from(CURRENCY.keys()).map((key, index) => (
                <button key={`currencyBtn_${index}`}
                        className={`currency-btn ${props.currency === key ? 'selected' : ''}`}
                        onClick={props.changeCurrency}>{key}
                </button>
            )
        );
    }

    const getStopsOptions = () => {

        const allStops = Array.from(new Set(data.tickets.map(ticket => ticket.stops))).sort();

        const stopOptions: JSX.Element[] = [
            <StopsOption key={`stopsOption_All`}
                         htmlId={'allStops'}
                         checked={!props.stopFilters.length}
                         label={'Все'}
                         stops={-1}
                         handleChange={() => props.setStopFilters([])}
                         handleClickOnlyThisOption={() => props.setStopFilters([])}
            />
        ];

        allStops.forEach((stops, index) => {
            stopOptions.push(<StopsOption key={`stopsOption_${index}`}
                                          htmlId={`stop_${stops}`}
                                          stops={stops}
                                          checked={props.stopFilters.includes(stops)}
                                          label={props.generateStopsLabel(stops)}
                                          handleChange={props.updateStopFilters}
                                          handleClickOnlyThisOption={() => props.setStopFilters([stops])}
                />
            );
        })

        return stopOptions;
    }

    return <div className="options-sidebar">
        <div className="currency-options">
            <h3 className='sidebar-header'>Валюта</h3>
            <div className="currency-btn-group">
                {getCurrencyButtons()}
            </div>
        </div>
        <div className="stops-options">
            <h3 className='sidebar-header'>Количество пересадок</h3>
            <form>
                {getStopsOptions()}
            </form>
        </div>
    </div>
}