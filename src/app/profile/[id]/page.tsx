interface UserProfilePageProps {
    params: {
        id: string;
    };
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
    return (
        <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
            <div className="bg-zinc-800 p-6 rounded-2xl shadow-lg w-80 text-center">
                <h1 className="text-2xl font-semibold mb-2">User Profile</h1>
                <p className="text-gray-400 text-sm mb-6">
                    Profile ID: <span className="text-orange-400">{params.id}</span>
                </p>

                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg cursor-pointer">
                    Edit Profile
                </button>
            </div>
        </div>
    );
};
