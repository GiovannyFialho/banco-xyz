export function Profile() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-4xl font-bold">
        Olá, <span>Giovanny</span>
      </h1>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 border-b border-dashed border-gray-300 pb-4">
          <p className="text-lg font-semibold">Nome:</p>
          <span className="text-base font-medium">Giovanny Fialho</span>
        </div>

        <div className="flex flex-col gap-1 border-b border-dashed border-gray-300 pb-4">
          <p className="text-lg font-semibold">E-mail:</p>
          <span className="text-base font-medium">giovannyf@outlook.com</span>
        </div>

        <div className="flex flex-col gap-1 border-b border-dashed border-gray-300 pb-4">
          <p className="text-lg font-semibold">Token:</p>

          <div className="w-max rounded-md bg-gray-200 px-5 py-2">
            <pre className="text-base font-medium">e2i1oej1onejno21</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
