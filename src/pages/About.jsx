function About() {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
      <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl text-center">We love</h1>
      <div className="stats bg-primary shadow">
        <div className="stat">
          <div className="stat-title text-primary-content text-4xl font-bold tracking-widest">
            WebStore
          </div>
        </div>
      </div>
      <p className="mt-6 tetxt-lg leading-8 max-w-2xl mx-auto">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quas recusandae deleniti doloribus numquam in molestias porro, at autem aliquid. Sequi totam facere labore. Quod quasi fuga voluptatem tempora error.
      </p>      
    </div>
  )
}

export default About;