import { Share } from 'react-native';
import { encodeToAscii } from './functionHash';

export async function onSharingBlog(blogId) {
    try {
        let urlShare = "https://server-pet-world.onrender.com/blog/shareBlog/" + encodeToAscii(blogId);
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
