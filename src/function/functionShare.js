import { Share } from 'react-native';
import { encodeToAscii } from './functionHash';

export async function onSharingBlog(blogId) {
    try {
        let urlShare = "https://c270-2405-4802-1c97-2540-7d-8acb-e9ff-7d8a.ngrok-free.app/blog/shareBlog/" + encodeToAscii(blogId);
        const result = await Share.share({
            message: urlShare,
            title: "Chia sẻ Blog này với:",
            url: urlShare
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
            } else {
            }
        } else if (result.action === Share.dismissedAction) {
        }
    } catch (error) {
        alert(error.message);
    }
}
