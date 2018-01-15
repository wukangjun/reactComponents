import React, {PropTypes} from 'react'
import {Component, Icons} from '@/components'
import {Link, withRouter} from 'react-router-dom'
import {Menu, Dropdown, Select, Popover} from 'antd'
import Menus from './menu'
import styles from './style/header.less'

@withRouter
export default class Header extends Component {
    static propTypes = {
        data: PropTypes.array  
    }
    constructor(props){
        super(props);
        this.state = {
            data: [],
            options: null
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            data: nextProps.data,
            options: this._menusRecursion(nextProps.data)
        })
    }
    render(){
        // 快速搜索菜单
        const menuLists = React.createElement(Menus, {data: this.state.options});
        // 下拉列表
        const dropdownItem = (
            <Menu>
                <Menu.Item>12</Menu.Item>
                <Menu.Item>34</Menu.Item>
            </Menu>
        );
        return (
            <div className={this.className('cv-header')}>
                <Popover placement="topLeft" title="菜单搜索" content={menuLists} trigger="click">
                    <Icons name="gengduo" color="#fff" style={{paddingLeft: 10}} />
                </Popover>
                <Dropdown overlay={dropdownItem}>
                    <a className='cv-dropdown'>用户名</a>
                </Dropdown>
            </div>
        )
    }
    /**
     * 
     * @param {*} menus: 递归的数组对象
     * @param {*} key : 对某个键值进行递归(默认值：child)
     */
    _menusRecursion(menus, key="child"){
        let menuLists = [];
        // 递归数组
        const recursion = (lists) => {
            if(Array.isArray(lists) && lists.length > 0){
                lists.forEach(list => {
                    list.url !== "" && menuLists.push(list);
                    recursion(list[key]);
                })
            }
        };
        recursion(menus);
        return menuLists;
    }
}