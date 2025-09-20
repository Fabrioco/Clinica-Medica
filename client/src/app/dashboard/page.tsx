import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="container flex flex-col items-center justify-center bg-[#f5fafd] py-2">
      <div className="flex flex-col items-center justify-center bg-white w-full md:w-11/12 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-[#1f3a6d] text-left pt-4">
          Dashboard
        </h1>
        <div className="flex flex-col gap-4 w-full p-2">
          <div className="flex justify-between items-center w-full gap-4">
            <input
              type="text"
              placeholder="Digite o nome"
              className="w-8/12 px-4 py-2 border rounded-md focus:ring focus:ring-[#1f3a6d] focus:outline-none focus:border-[#1f3a6d]"
            />
            <select
              name="category"
              id="category"
              className="w-4/12 px-4 py-2 border rounded-md focus:ring focus:ring-[#1f3a6d] focus:outline-none focus:border-[#1f3a6d]"
            >
              <option value="all">Todos</option>
              <option value="patient">Paciente</option>
              <option value="doctor">Médico</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col justify-between items-center w-full rounded-lg border border-gray-300 shadow">
              <div className="flex justify-between items-center w-full font-bold text-xl py-4 px-8 border-b border-gray-300">
                <span>Nome</span>
                <span>Email</span>
                <span>Cargo</span>
              </div>

              <div className="flex flex-col gap-4 w-full justify-between items-center mt-4 px-4">
                <div className="flex justify-between items-center w-full hover:bg-gray-100 px-4 py-2 rounded-md hover:shadow-md">
                  <span>
                    <Link href="/dashboard/1" className="text-[#1f3a6d]">
                      Nome
                    </Link>
                  </span>
                  <span>Email</span>
                  <span>Paciente</span>
                </div>

                <div className="flex justify-between items-center w-full hover:bg-gray-100 px-4 py-2 rounded-md hover:shadow-md">
                  <span>
                    <Link href="/dashboard/1" className="text-[#1f3a6d]">
                      Nome
                    </Link>
                  </span>
                  <span>Email</span>
                  <span>Paciente</span>
                </div>

                <div className="flex justify-between items-center w-full hover:bg-gray-100 px-4 py-2 rounded-md hover:shadow-md">
                  <span>
                    <Link href="/dashboard/1" className="text-[#1f3a6d]">
                      Nome
                    </Link>
                  </span>
                  <span>Email</span>
                  <span>Paciente</span>
                </div>

                <div className="flex justify-between items-center w-full hover:bg-gray-100 px-4 py-2 rounded-md hover:shadow-md">
                  <span>
                    <Link href="/dashboard/1" className="text-[#1f3a6d]">
                      Nome
                    </Link>
                  </span>
                  <span>Email</span>
                  <span>Paciente</span>
                </div>

                <div className="flex justify-between items-center w-full hover:bg-gray-100 px-4 py-2 rounded-md hover:shadow-md">
                  <span>
                    <Link href="/dashboard/1" className="text-[#1f3a6d]">
                      Nome
                    </Link>
                  </span>
                  <span>Email</span>
                  <span>Paciente</span>
                </div>

                <div className="flex justify-between items-center w-full hover:bg-gray-100 px-4 py-2 rounded-md hover:shadow-md">
                  <span>
                    <Link href="/dashboard/1" className="text-[#1f3a6d]">
                      Nome
                    </Link>
                  </span>
                  <span>Email</span>
                  <span>Paciente</span>
                </div>

                <div className="flex justify-between items-center w-full hover:bg-gray-100 px-4 py-2 rounded-md hover:shadow-md">
                  <span>
                    <Link href="/dashboard/1" className="text-[#1f3a6d]">
                      Nome
                    </Link>
                  </span>
                  <span>Email</span>
                  <span>Paciente</span>
                </div>

                <div className="flex justify-between items-center w-full hover:bg-gray-100 px-4 py-2 rounded-md hover:shadow-md">
                  <span>
                    <Link href="/dashboard/1" className="text-[#1f3a6d]">
                      Nome
                    </Link>
                  </span>
                  <span>Email</span>
                  <span>Paciente</span>
                </div>

                <div className="flex justify-between items-center w-full hover:bg-gray-100 px-4 py-2 rounded-md hover:shadow-md">
                  <span>
                    <Link href="/dashboard/1" className="text-[#1f3a6d]">
                      Nome
                    </Link>
                  </span>
                  <span>Email</span>
                  <span>Paciente</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

