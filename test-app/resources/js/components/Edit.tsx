import React, { useState, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Channel {
    id: number;
    name: string;
    amount: string;
}


const Edit: React.FC = () => {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('/save-channels', {
                channels: channels.map(channel => ({
                    name: channel.name,
                    amount: channel.amount,
                })),
            });
            return toast.success(response.data.message, {
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
        } catch (error) {
            return toast.error('Wystapil blad podczas zapisywania kanalow', {
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

    const handleAddChannel = () => {
        setChannels([
            ...channels,
            { id: channels.length + 1, name: "", amount: '0' }
        ]);
    };

    const handleChange = (index: number, field: string, value: string) => {
        const updatedChannels = [...channels];
        (updatedChannels[index] as any)[field] = value;
        setChannels(updatedChannels);
    };

    const handleRemoveChannel = (index: number) => {
        const updatedChannels = channels.filter((_, i) => i !== index);
        setChannels(updatedChannels);
    };

    return (
        <div className="w-screen">
            <div className="flex flex-col gap-4 lg:flex-row items-center justify-center mx-auto w-full mt-12 relative">
                <h1 className="text-4xl font-semibold text-center">Edycja danych</h1>
                <button
                    onClick={() => { navigate('/') }}
                    className="bg-[#F24A08] rounded-md text-white hover:bg-white hover:border-2 hover:border-[#F24A08] hover:text-[#F24A08] transition-all duration-300 ease-in-out ml-4 border-2 border-transparent text-sm font-semibold px-4 py-2"
                >
                    ZOBACZ DANE
                </button>
            </div>

            <div className="w-fit mx-auto mt-24">
                <div className="bg-[#F24A08] text-white px-24 text-2xl rounded-t-lg py-12 text-center">
                    Formularz edycji danych
                </div>
                <div className="border border-[#F24A08] rounded-b-lg">
                    <form className="flex flex-col gap-4 lg:p-12 p-6" onSubmit={handleSubmit}>
                        {channels.map((channel, index) => (
                            <div key={channel.id} className="flex flex-row gap-4 items-center">
                                <button
                                    type="button"
                                    onClick={() => handleRemoveChannel(index)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md mt-7"
                                >
                                    X
                                </button>
                                <div className="w-1/2">
                                    <label className="text-lg font-semibold" htmlFor={`channel-${index}`}>Kanał</label>
                                    <input
                                        type="text"
                                        id={`channel-${index}`}
                                        name={`channel-${index}`}
                                        value={channel.name}
                                        required
                                        placeholder="Nazwa kanału"
                                        onChange={(e) => handleChange(index, "name", e.target.value)}
                                        className="border border-[#F24A08] rounded-md p-2 w-full"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="text-lg font-semibold" htmlFor={`amount-${index}`}>Ilość</label>
                                    <input
                                        type="number"
                                        id={`amount-${index}`}
                                        name={`amount-${index}`}
                                        value={parseInt(channel.amount)}
                                        required
                                        placeholder="Ilość"
                                        onChange={(e) => handleChange(index, "amount", e.target.value)}
                                        className="border border-[#F24A08] rounded-md p-2 w-full"
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddChannel}
                            className="bg-[#F24A08] text-white rounded-md hover:bg-white hover:border-2 hover:border-[#F24A08] hover:text-[#F24A08] transition-all duration-300 ease-in-out ml-4 border-2 border-transparent text-sm font-semibold px-4 py-2"
                        >
                            Dodaj kanał
                        </button>
                        <button
                            type="submit"
                            className="mt-12 bg-[#F24A08] text-white rounded-md hover:bg-white hover:border-2 hover:border-[#F24A08] hover:text-[#F24A08] transition-all duration-300 ease-in-out ml-4 border-2 border-transparent text-sm font-semibold px-4 py-2"
                        >
                            ZAPISZ
                        </button>
                    </form>
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

export default Edit;
