import React, { useEffect, useState } from "react";
import PieChart from "./charts/PieChart";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Channel {
    id: number;
    name: string;
    amount: string;
}


const Charts: React.FC = () => {
    const navigate: NavigateFunction = useNavigate();
    const [channels, setChannels] = useState<Channel[]>([]);

    useEffect(() => {
        const fetchChannels = async () => {
            try {
                const response = await axios.get('/channels');
                setChannels(response.data);
            } catch (error) {
                return toast.error('Wystapil blad podczas ladowania kanalow', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        };

        fetchChannels();
    }, []);
    return (
        <div className="w-screen">

            <div className="flex flex-col gap-4 lg:flex-row items-center justify-center mx-auto w-full mt-12 relative">
                <h1 className="text-4xl font-semibold text-center">Podgląd danych</h1>
                <button
                    onClick={() => { navigate('/edit') }}
                    className="bg-[#F24A08] rounded-md text-white hover:bg-white hover:border-2 hover:border-[#F24A08] hover:text-[#F24A08] transition-all duration-300 ease-in-out ml-4 border-2 border-transparent text-sm font-semibold px-4 py-2"
                >
                    EDYTUJ DANE
                </button>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-around w-screen p-12">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="border border-black p-2 text-center">Kanał</th>
                            <th className="border border-black p-2 text-center">Ilość</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            channels.length > 0 ? channels.map((channel: Channel, i: number) => {
                                return (
                                    <tr key={i} className="cursor-pointer border-b hover:bg-[#F24A08] transition-all hover:text-white">
                                        <td className="border border-black p-2 text-center">{channel.name}</td>
                                        <td className="border border-black p-2 text-center">{channel.amount}</td>
                                    </tr>
                                );
                            })
                        : <p className="text-center p-4">Brak danych</p>}
                    </tbody>
                </table>
                <div className="w-full h-96">
                    <PieChart data={channels} />
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
        </div>
    );
};

export default Charts;
