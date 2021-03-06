import React, {PropTypes} from 'react'
import {Button, Input, Form} from 'antd'
import {Component, Icons} from '@/components'
import {Password} from '@/utils'
import style from '@/viewstheme/login/loginFrame.less'

@Form.create()
export default class LoginFrame extends Component {
    static propTypes = {
        loading: PropTypes.bool
    }
    constructor(props){
        super(props);
        this.state = {
            loading: props.loading || false
        }
    }
    render(){
        const {getFieldDecorator} = this.props.form;
        return (
            <div 
            style={this.style()}
            className={this.className('cv-loginframe')} >
                <div className='cv-loginheader'>车辆监控系统</div>
                <Form onSubmit={this.handlerSubmit.bind(this)} className='cv-loginform'>
                    <Form.Item>
                        {
                            getFieldDecorator('enterpriseCode', {
                                rules: [
                                    {required: true, message: '请输入公司编码'}
                                ]
                            })
                            (<Input prefix={<Icons name="building" size="18" />} placeholder="公司编号" />)
                        }
                    </Form.Item>
                    <Form.Item>
                        {
                            getFieldDecorator('account', {
                                rules: [
                                    {required: true, message: '请输入用户名'}
                                ]
                            })
                            (<Input prefix={<Icons name="renyuan1" size="18"/>} placeholder="用户名" />)
                        }
                    </Form.Item>
                    <Form.Item>
                        {
                            getFieldDecorator('password', {
                                rules: [
                                    {required: true, message: '请输入密码'}
                                ]
                            })
                            (<Input type="password" prefix={<Icons name="suo" size="18"/>} placeholder="密码" />)
                        }
                    </Form.Item>
                    <Form.Item>
                        <Button 
                        loading={this.state.loading}
                        type="primary" 
                        htmlType="submit" 
                        className='cv-loginsubmit'>登陆</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            loading: nextProps.loading
        })
    }
    /**
     * 提交数据
     * @param {*} e 
     */
    handlerSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err && this.props.onSubmit){
                // 对密码加密
                values.password = Password.$SHA512(Password.$SHA512(values.password) +'&'+values.account);
                this.props.onSubmit(values);
            }
        })
    }
}