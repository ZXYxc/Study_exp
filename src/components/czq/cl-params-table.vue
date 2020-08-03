<template>
<div>
    <el-table :data="params" :border="true" stripe>
        <el-table-column prop="externalName" label="变量名" width="150">
            <template slot-scope="scope">
                <el-tooltip :content="scope.row.desc" placement="top-start">
                    <span>{{ scope.row.externalName }}</span>
                </el-tooltip>
            </template>
        </el-table-column>
        <el-table-column prop="type" label="变量类型" width="120"></el-table-column>
        <el-table-column label="值" width="459">
            <template slot-scope="scope">
                <div v-if="scope.row.type === 'System.Boolean'">
                    <el-switch v-model="scope.row.value" active-text="true" inactive-text="false"></el-switch>
                </div>
                <div v-else-if="scope.row.type === 'System.Single'">
                    <div v-if="(minMax = GetMinMax(scope.row.domain)).min">
                        <div v-if="minMax.max">
                            <el-slider v-model="scope.row.value" :min="minMax.min" :max="minMax.max" :step="0.1" show-input></el-slider>
                        </div>
                        <div v-else>
                            <el-input-number v-model="scope.row.value" :min="minMax.min" :step="0.1" controls-position="right" style="width:100%"></el-input-number>
                        </div>
                    </div>
                    <div v-else>
                        <div v-if="minMax.max">
                            <el-input-number v-model="scope.row.value" :max="minMax.max" :step="0.1" controls-position="right" style="width:100%"></el-input-number>
                        </div>
                        <div v-else>
                            <el-input-number v-model="scope.row.value" :step="0.1" controls-position="right" style="width:100%"></el-input-number>
                        </div>
                    </div>
                </div>
                <div v-else-if="scope.row.type === 'System.Int32'">
                    <div v-if="(minMax = GetMinMax(scope.row.domain)).min">
                        <div v-if="minMax.max">
                            <el-slider v-model="scope.row.value" :min="minMax.min" :max="minMax.max" show-input show-stops></el-slider>
                        </div>
                        <div v-else>
                            <el-input-number v-model="scope.row.value" :min="minMax.min" controls-position="right" style="width:100%"></el-input-number>
                        </div>
                    </div>
                    <div v-else>
                        <div v-if="minMax.max">
                            <el-input-number v-model="scope.row.value" :max="minMax.max" controls-position="right" style="width:100%"></el-input-number>
                        </div>
                        <div v-else>
                            <el-input-number v-model="scope.row.value" controls-position="right" style="width:100%"></el-input-number>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <el-input v-model="scope.row.value"></el-input>
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="domain" label="值域" width="180">
            <template slot-scope="scope">
                <div v-if="scope.row.type == 'System.Single' || scope.row.type == 'System.Int32'">
                    <div v-if="(minMax = GetMinMax(scope.row.domain)).min">
                        <div v-if="minMax.max">
                            {{ minMax.min + ' ≤ ' + scope.row.externalName + ' ≤ ' + minMax.max }}
                        </div>
                        <div v-else>
                            {{ scope.row.externalName + ' ≥ ' + minMax.min }}
                        </div>
                    </div>
                    <div v-else>
                        <div v-if="minMax.max">
                            {{ scope.row.externalName + ' ≤ ' + minMax.max }}
                        </div>
                        <div v-else>
                            无限制
                        </div>
                    </div>
                </div>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
export default {
	data: function() {
		return {
			params: [{
				externalName: 'current',
				desc: '电流',
				type: 'System.Single',
                value: 1,
				domain: ','
			},
			{
				externalName: 'voltage',
				desc: '电压',
				type: 'System.Int32',
                value: 3,
				domain: '-1,1'
			},
			{
				externalName: 'isOn',
				desc: '打开了吗',
				type: "System.Boolean",
                value: true,
				domain: ''
			}]
		}
	},
	methods: {
		GetMinMax(domain) {
			var boundries = domain.split(',')
			return {
				min: isNaN(boundries[0]) ? null : parseFloat(boundries[0]),
				max: isNaN(boundries[1]) ? null : parseFloat(boundries[1])
			}
		}
	}
}
</script>

<style>

</style>