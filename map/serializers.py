from rest_framework import serializers

from map.models import CommunityArea, RestaurantPermit


class CommunityAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityArea
        fields = ["name", "num_permits", "area_id"]

    num_permits = serializers.SerializerMethodField()

    def get_num_permits(self, obj):
        year = self.context.get("year")
        permits = RestaurantPermit.objects.filter(community_area_id=str(obj.area_id))

        if year:
            permits = permits.filter(issue_date__year=year)
        return permits.count()
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        name = data.pop("name")
        return {name: data}
