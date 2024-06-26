from django.urls import path
from .views import AziendeListView, AziendeDetailView, AziendeCreateView, AziendeUpdateView, AziendeDeleteView

urlpatterns = [
    path('', AziendeListView.as_view(), name='aziende-list'),
    path('<int:pk>/', AziendeDetailView.as_view(), name='aziende-detail'),
    path('create/', AziendeCreateView.as_view(), name='aziende-create'),
    path('<int:pk>/update/', AziendeUpdateView.as_view(), name='aziende-update'),
    path('<int:pk>/delete/', AziendeDeleteView.as_view(), name='aziende-delete'),
]
