template: `
    <ul>
    <transition-group name="list" tag="p">
        <li v-for="job in sortedJobs" :key="job.title">
            <div class="flex items-center">
                <img class="h-8 w-8 rounded-full mr-3 inline-block align-middle"
                    v-if="job.author_profile"
                    :src="job.author_profile" />
                <a class="text-orange-500" :href="job.url" @click="open">open</a>&nbsp;
                <span @click="viewing = viewing === job.title ? '' : job.title"
                      style="min-width: 250px;max-width: 250px" 
                      class="inline-block align-middle truncate">{{ job.title }}</span>
            <div class="flex pl-5" style="min-width: 70px;max-width: 70px" >
                <svg v-for="i in job.price_amount" 
                    :key="i" 
                    :class="i <= job.price_amount ? 'text-yellow-500' : 'text-black'" 
                    class="-ml-1 w-4 h-4 fill-current text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M10 20a10 10 0 110-20 10 10 0 010 20zm1-5h1a3 3 0 000-6H7.99a1 1 0 010-2H14V5h-3V3H9v2H8a3 3 0 100 6h4a1 1 0 110 2H6v2h3v2h2v-2z"/>
                </svg>
            </div>
            <span class="pl-5">{{job.ago}}</span>
            </div>
            <p v-if="viewing == job.title"
                @click="copy"
                class="p-2"
                style="width: 500px"
                v-text="job.description" />
        </li>
    </transition-group>
    </ul>
`,
props: {
    input: {
        type: String,
        require: true,
    }
},
data: function() {
    return {
        style: 'simple',
        viewing: '',
    }
},
computed: {
    sortedJobs: function() {
        return this.jobs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).reverse()
    },
    jobs: function() {
        return JSON.parse(this.input)
    },
    output: function() {
        if(this.style === 'human') {
            return this.input.substr(0, this.input.indexOf(','));
        } else if (this.style === 'simple') {
            return this.input.substr(this.input.indexOf(',') + 1);
        }
    }
},
methods: {
    copy: function(event) {
        // variable content to be copied
        var copyText = event.target.innerText
        // create an input element
        let input = document.createElement('input');
        // setting it's type to be text
        input.setAttribute('type', 'text');
        // setting the input value to equal to the text we are copying
        input.value = copyText;
        // appending it to the document
        document.body.appendChild(input);
        // calling the select, to select the text displayed
        // if it's not in the document we won't be able to
        input.select();
        // calling the copy command
        document.execCommand("copy");
        // removing the input from the document
        document.body.removeChild(input)
    },
    open: function(event) {
        var url = event.target.href;
        window.open(url,"","titlebar=no");
    },
    toggle: function() {
        this.style = this.style === 'simple' ? 'human' : 'simple'
    }
}
