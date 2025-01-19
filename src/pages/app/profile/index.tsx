import { useUser } from "@/contexts/user-context";

export function Profile() {
  const { token, user } = useUser();

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-4xl font-bold">
        Olá, <span>{user?.name.split(" ")[0]}</span>
      </h1>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 border-b border-dashed border-gray-300 pb-4">
          <p className="text-lg font-semibold">Nome:</p>
          <span className="text-base font-medium">{user?.name}</span>
        </div>

        <div className="flex flex-col gap-1 border-b border-dashed border-gray-300 pb-4">
          <p className="text-lg font-semibold">E-mail:</p>
          <span className="text-base font-medium">{user?.email}</span>
        </div>

        <div className="flex flex-col gap-1 border-b border-dashed border-gray-300 pb-4">
          <p className="text-lg font-semibold">Token:</p>

          <div className="w-max rounded-md bg-gray-200 px-5 py-2">
            <pre className="text-base font-medium">{token}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
