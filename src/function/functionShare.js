import { Share } from 'react-native';
import { encodeToAscii } from './functionHash';

export async function onSharingBlog(blogId) {
    try {
        let urlShare = "https://9307-2402-800-61c4-4085-1115-3d2b-6c5f-cb97.ngrok-free.app/blog/shareBlog/" + encodeToAscii(blogId);
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
