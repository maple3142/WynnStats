<!--component for outer link-->
<template functional>
	<a :href="props.href" rel="noopener noreferrer" target="_blank">
		<slot />
	</a>
</template>
