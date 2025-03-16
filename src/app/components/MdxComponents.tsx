const MdxComponents = {
  h1: ({ children }: { children: string }) => <h1 className="text-4xl font-extrabold text-blue-600">{children}</h1>,
  h2: ({ children }: { children: string }) => <h2 className="text-3xl font-semibold text-green-600">{children}</h2>,
  h3: ({ children }: { children: string }) => <h3 className="text-2xl font-medium text-red-500">{children}</h3>,
  h4: ({ children }: { children: string }) => <h4 className="text-xl font-medium text-purple-400">{children}</h4>,
  h5: ({ children }: { children: string }) => <h5 className="text-lg font-normal text-gray-800">{children}</h5>,
  h6: ({ children }: { children: string }) => <h6 className="text-base font-normal text-black">{children}</h6>,
}

export default MdxComponents
