import { useUser } from "@/contexts/user-context";

export function Profile() {
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-4xl font-bold">
        Olá, <span>{user?.name.split(" ")[0]}</span>
      </h1>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 border-b border-dashed border-gray-300 pb-4">
          <p className="text-lg font-semibold">Nome:</p>
          <span className="text-base font-medium" data-testid="profile-name">
            {user?.name}
          </span>
        </div>

        <div className="flex flex-col gap-1 border-b border-dashed border-gray-300 pb-4">
          <p className="text-lg font-semibold">E-mail:</p>
          <span className="text-base font-medium" data-testid="profile-email">
            {user?.email}
          </span>
        </div>
      </div>
    </div>
  );
}
