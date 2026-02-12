import mongoose, {Schema} from "mongoose";

export interface Profile{
    _id: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    name: string;
    totalPoints: number;
    currentStreak: number;
    acheivements: number;
    lastActivity: Date;
};

const ProfileSchema: Schema<Profile> = new mongoose.Schema<Profile>({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true},
    name: {type: String, required: true},
    totalPoints: {type: Number, default: 0},
    currentStreak: {type: Number, default: 0},
    acheivements: {type: Number, default: 0},
    lastActivity: {type: Date, default: new Date(0)}
}, {
    timestamps: true
});

//attach index for leaderboard sorting
ProfileSchema.index({totalPoints: -1});

export const ProfileModel = mongoose.models.Profile as mongoose.Model<Profile> || 
mongoose.model<Profile>('Profile', ProfileSchema);



