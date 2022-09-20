import { useState } from 'react'
import './App.css'

interface User {
    email: string
    password: string
}

interface Message {
    message: string
    tone: 'positive' | 'negative'
}

function App() {
    const [registeredUser, setRegisteredUser] = useState<User | null>(null)
    const [email, setEmail] = useState('')
    const [title, setTitle] = useState('Login')
    const [message, setMessage] = useState({ message: '', tone: 'positive' })
    const [success, setSuccess] = useState(false)
    const [password, setPassword] = useState('')

    function validateForm() {
        if(!email) {
            setMessage({message: "Email is required", tone: 'red'})
            return false
        }
        if(!email.includes('@')) {
            setMessage({message: "Invalid email, must have an @", tone: 'red'})
            return false
        }
        if(!password) {
            setMessage({message: "Password is required", tone: 'red'})
            return false
        }
        if(password.length < 8) {
            setMessage({message: "Password must be at least 8 characters", tone: 'red'})
            return false
        }
        return true
    }

    function handleLogin() {
        if(!validateForm()) return
        if(title.toLowerCase() !== 'login') {
            setMessage({message: "You are not on the Login page", tone: 'red'})
        } else if(registeredUser === null) {
            setMessage({message: "Email not recognized. Please Register below.", tone: 'red'})
        } else if(registeredUser && email === registeredUser.email && password === registeredUser.password) {
            setSuccess(true)
        }
    }

    function handleRegister() {
        if(!validateForm()) return
        if(title.toLowerCase() !== 'register') {
            setMessage({message: "You are not on the Register page", tone: 'red'})
        } else {
            setRegisteredUser({ email, password })
            setEmail('')
            setPassword('')
            setMessage({message: "Registered", tone: 'positive'})
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-[500px] mx-auto pt-12 space-y-4">
                <div className="bg-white p-6 border rounded space-y-8">
                    {success ? (
                        <div>
                            <h1 className="text-2xl">Congratulations!</h1>
                            <p>You solved the puzzle.</p>
                        </div>
                    ) : (
                        <>
                            <input
                                className={"h-12 text-4xl font-bold focus:outline-none " + (title.toLowerCase() === 'login' || title.toLowerCase() === 'register' ? 'text-black' : 'text-gray-600')}
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />

                            <div className="flex flex-col gap-2">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    className="h-10 border rounded focus-visible:ring focus:outline-none focus:border-blue-500 px-2"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    className="h-10 border rounded focus-visible:ring focus:outline-none focus:border-blue-500 px-2"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>


                            <div className="flex justify-end gap-4 items-center">
                                {message && <p className={message.tone === 'positive' ? 'text-green-600' : 'text-red-600'}>{message.message}</p>}
                                <div className="flex flex-col overflow-y-auto hide-scrollbar gap-2 h-10 snap-y snap-mandatory">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 rounded text-white px-4 min-h-10 h-10 snap-center"
                                        onClick={handleLogin}
                                    >
                                        Login
                                    </button>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 rounded text-white px-4 min-h-10 h-10 snap-center"

                                        onClick={handleRegister}
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <footer className="text-sm text-gray-600 text-center">
                    A login-form puzzle game by Adrian Aleixandre
                    <br />
                    <i>Note: No browser devtools allowed!</i>
                </footer>
            </div>
        </div>
    )
}

export default App
