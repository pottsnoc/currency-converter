import React from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import PerfectScrollBar from 'react-perfect-scrollbar';

import './ConverterPage.css';

class ConverterPage extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            options: [],
            firstSelected: {},
            secondSelected: {},
            firstValue: '',
            secondValue: '',
            cross: 0
        }
    }
    componentDidMount() {
        const options = this.props.currencies;
        const firstSelected = options.find(item => item.base);
        const secondSelected = options.find(item => !item.base);
        
        this.setState({options,
                       firstSelected,
                       secondSelected});
        this.updateCross();
        this.updateValue(firstSelected.value, 'firstValue');
    }
    updateValue(value, target) {
        if(!value || +value < 0) {
            return value ? null : this.setState({[target]: value});
        }
        const regexp = /^-?\d+[,.]?(\d{1,2})?/;
        value = regexp.exec(value)[0];
        this.setState({[target]: value});
        this.convertCurrency(target);
    }
    convertCurrency(base) {
        const invert = {firstValue: 'secondValue', secondValue: 'firstValue'};
        this.setState(({cross, [base] : value}) => {
            let convertValue = base === 'firstValue' ?
                               value * cross :
                               value / cross;
            return {[invert[base]]: Math.round(convertValue * 100)/100}
        })
    }
    selectCurrency(option) {
        this.setState(option);
        this.updateCross();
        const base = option.firstSelected ? 'firstValue' : 'secondValue';
        this.convertCurrency(base);

    }
    updateCross() {
        this.setState(({firstSelected, secondSelected}) => {
            return {cross: firstSelected.value / secondSelected.value};
        })
    }
    render() {
        const {options,
               firstSelected,
               secondSelected,
               firstValue,
               secondValue} = this.state;
        return (
            <div className='container'>
                <div className='jumbotron'>
                    <h1 className='converter-title'>Конвертер валют</h1>
                    <div>{firstValue} {firstSelected.name} равно</div>
                    <div>{secondValue} {secondSelected.name}</div>
                </div>
                <div className='row'>
                    <div className='col-12 col-md-6 mb-3 mb-md-0 d-flex justify-content-between'>
                        <Select options={this.props.currencies}
                                value={firstSelected}
                                getOptionLabel={curr => curr.charCode}
                                getOptionValue={curr => curr.charCode}
                                components={{MenuList}}
                                styles={{container: base => ({...base, width: '48%'})}}
                                onChange={e => this.selectCurrency({firstSelected: e})}/>
                        <input className='converter-text-input' type='number'
                                step='any'
                                value={firstValue}
                                onChange={e => this.updateValue(e.target.value, 'firstValue')}/>
                    </div>
                    <div className='col-12 col-md-6 d-flex justify-content-between flex-row-reverse flex-md-row'>
                        <input className='converter-text-input' type='number'
                                step='any'
                                value={secondValue}
                                onChange={e => this.updateValue(e.target.value, 'secondValue')}/>
                        <Select options={options}
                                value={secondSelected}
                                getOptionLabel={curr => curr.charCode}
                                getOptionValue={curr => curr.charCode}
                                components={{MenuList}}
                                styles={{container: base => ({...base, width: '48%'})}}
                                onChange={e => this.selectCurrency({secondSelected: e})}/>
                    </div>
                </div>
            </div>
        )
    }
}
const MenuList = (props) => {
    return(
        <PerfectScrollBar style={{height: '200px'}}
                        containerRef={ref => props.innerRef(ref)}>
            {props.children}
        </PerfectScrollBar>
    )
}
const mapStateToProps = ({currencies}) => ({currencies})
export default connect(mapStateToProps)(ConverterPage);