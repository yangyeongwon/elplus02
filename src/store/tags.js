import { defineStore } from 'pinia';
import {ref, reactive, computed} from 'vue'

export const useTagsStore = defineStore('tags', () => {
	const list = reactive([])

	const show = computed(() => list.length);
	const nameList = computed(() => list.map(item => item.name))

	function delTagsItem(index){
		list.splice(index, 1);
		console.log(nameList);
	}

	function setTagsItem(data) {
		if(data.path !== '/dashboard') list.push(data);
		else list.unshift(data);
	}

	function clearTags() {
		list.splice(0, list.length);
	}

	function closeTagsOther(data) {
		clearTags();
		list.push(data);
	}

	function closeCurrentTag(data) {
		for (let i = 0, len = list.length; i < len; i++) {
			const item = list[i];
			if (item.path === data.$route.fullPath) {
				if (i < len - 1) {
					data.$router.push(list[i + 1].path);
				} else if (i > 0) {
					data.$router.push(list[i - 1].path);
				} else {
					data.$router.push('/');
				}
				list.splice(i, 1);
				break;
			}
		}
	}

	return {list, show, nameList, delTagsItem, setTagsItem, clearTags, closeTagsOther, closeCurrentTag}
});
