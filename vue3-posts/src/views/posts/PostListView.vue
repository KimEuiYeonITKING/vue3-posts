<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<PostFilter
			v-model:title="params.title_like"
			v-model:limit="params._limit"
		></PostFilter>
		<hr class="my-4" />
		<AppGrid :items="posts">
			<template v-slot="{ item }">
				<PostItem
					:title="item.title"
					:content="item.content"
					:created-at="item.createdAt"
					@click="goPage(item.id)"
				></PostItem>
			</template>
		</AppGrid>
		<AppPagination
			:current-page="params._page"
			:page-count="pageCount"
			@page="page => (params._page = page)"
		/>
		<template v-if="posts && posts.length > 0">
			<hr class="my-5" />
			<AppCard>
				<PostDetailView :id="posts[0].id"></PostDetailView>
			</AppCard>
		</template>
	</div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import AppPagination from '../../components/AppPagination.vue';
import PostFilter from '../../components/posts/PostFilter.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import AppCard from '@/components/AppCard.vue';
import AppGrid from '../../components/AppGrid.vue';
import { getPosts } from '@/api/posts.js';
import { ref, computed, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const posts = ref([]);

const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_limit: 3,
	_page: 1,
	title_like: '',
});
// pagination
const totalCount = ref(0);
const pageCount = computed(() =>
	Math.ceil(totalCount.value / params.value._limit),
);

const fetchPosts = async () => {
	// 프로미스는 자바스크립트에서 비동기 처리할 때 사용하는 객체
	// 값을 받을 때는 .then((response)=>{
	// })으로 받을 수 있다.
	// 오류는 .catch
	// async await 문법적으로 읽기 쉽게 바꾼것임.
	try {
		const { data, headers } = await getPosts(params.value); // 내부적으로 then안에서 정의 된거나 다름없음.
		posts.value = data;
		totalCount.value = headers['x-total-count'];
	} catch (error) {
		console.error(error);
	}
	//객체를 콘솔로 찍을때
	// console.dir(response);

	// getPosts()
	// 	.then(response => {
	// 		console.log('response: ', response);
	// 	})
	// 	.catch(error => {
	// 		console.log('error: ', error);
	// 	});
};
watchEffect(fetchPosts);
// fetchPosts();
const goPage = id => {
	// router.push(`/posts/${id}`);
	//http://localhost:5173/posts/1?searchText=hello#world
	router.push({
		name: 'PostDetail',
		params: {
			id,
		},
		// query: {
		// 	searchText: 'hello',
		// },
		// hash: '#world',
	});
};
</script>

<style lang="scss" scoped></style>
