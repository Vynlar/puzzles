export function Welcome() {
    return <div className='mx-auto max-w-screen-md pt-16 space-y-8'>

        <div className="space-y-8">
            <h1 className="text-2xl">Welcome to my puzzles page</h1>

            <ul className="space-y-4">
                <li className='py-2 px-4 bg-gray-100'>
                    <a href="/login">
                        <h2 className="font-bold text-blue-500">
                            Login puzzle
                        </h2>
                    </a>
                    <p>
                        A website login form with a twist. Can you make it?
                    </p>
                </li>

                <li className='py-2 px-4 bg-gray-100'>
                    <a href="/ombre">
                        <h2 className="font-bold text-blue-500">
                            Ombre Design Studio
                        </h2>
                    </a>
                    <p>
                        Something is off about this website -- what could it be?
                    </p>
                </li>
            </ul>
        </div>

        <footer className='font-gray-600 italic text-center text-sm'>
            Made by <a className="underline" href="https://adrianaleixandre.com">Adrian Aleixandre</a>
        </footer>
    </div>
}
