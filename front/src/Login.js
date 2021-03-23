import React, { Component } from "react";
import axios from "axios";


export default class Login extends Component {

    /**
     * 
     * @param {*} e input에 적는 정보 동적으로 받기 
     */
    InputHandler = (e) => {
        const { id, value } = e.target;
        this.setState({
            [id]: value
        })
    }

    // 회원가입
    SignUp() {
        let path = 'http://localhost:4000/sign-up';
        let data = {
            'email': document.querySelector('#email').value,
            'bjid': document.querySelector('#bjid').value,
            'password': document.querySelector('#password').value,
        }
        axios.post(path, data)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
    // 로그인
    SignIn() {
        let path = 'http://localhost:4000/sign-in';
        let data = {
            'email': document.querySelector('#email').value,
            'password': document.querySelector('#password').value
        }
        axios.post(path, data)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
    // 로그아웃
    SignOut() {
        let path = 'http://localhost:4000/sign-out';
        axios.get(path)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
    // 회원 탈퇴
    Secede() {
        let path = 'http://localhost:4000/sign-secede';
        axios.get(path)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
    // 로그인 체크
    Check() {
        let path = 'http://localhost:4000/sign-check';
        axios.get(path)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        return (
            <form className="Login-base">
                <input
                    type="text"
                    placeholder="이메일"
                    className="Email_input"
                    id="email"
                    onChange={this.InputHandler}
                />
                <input
                    type="text"
                    placeholder="백준 아이디"
                    className="BJID_input"
                    id="bjid"
                    onChange={this.InputHandler}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    className="Password_input"
                    id="password"
                    onChange={this.InputHandler}
                />
                <div className="Login-buttons">
                    <button onClick={this.SignUp}>
                        회원가입
                    </button>
                    <button onClick={this.SignIn}>
                        로그인
                    </button>
                    <button onClick={this.SignOut}>
                        로그아웃
                    </button>
                    <button onClick={this.Secede}>
                        회원탈퇴
                    </button>
                    <button onClick={this.Check}>
                        로그인 체크
                    </button>
                </div>
            </form>
        )
    }
}


